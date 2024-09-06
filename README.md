Router Concepts
1. What is a router state ?

It is the arrangement of components that defines what is visible on the screen. Router configuration is a tree, with every node representing a route. Some nodes have components associated with them and some do not.
A component can be instantiated only once but activated multiple times(anytime when the route parameters change).
If a route has multiple children for the same outlet, only 1 child can be activated at a time in the outlet. A outlet is nothing but a location in the DOM where the component will be placed. We cannot place more than 1 component in the same place at the same time.

2. Navigation is transitioning between 1 router state to another. In any well behaved application, state transition results in URL change and vice- versa.
=>Apply redirects
=> Derive router state from url
=> Apply guards if any
=>Execute data resolvers if any
=>Instantiate/Activate components
The router gets the URL from the user, either when the user clicks on the link or updates the location bar directly. The first thing that the router does with the url is applying any redirects(if any).
A redirect is a substitution of the URL segment. Redirects can either be local or absolute. Local redirect replaces a single segment with a different once. Absolute redirect replaces the whole URL. Redirects are local unless you prefix the url with a "/".
Next the router will derive the router state from the url. Once the router state is determined, the router will check if transitioning to the new state is permitted via guards(if any).
Assuming the guards have permitted to transition to the state, the router will not resolve the data via resolvers we have defined. 
Finally the router will instantiate/activate the component.

3. URL segments
A UrlSegment is a part of a URL between the two slashes. Each URL segment has a path and parameters associated with it. Parameters can params or query params. Params are mandatory and is used for state identification. Query Params are optional.

=>component less routes with some path
You can share parameters between sibling components. For example, suppose that two sibling components should go next to each other, and both of them require an ID parameter. You can accomplish this using a route that does not specify a component at the top level.

The router merges the parameters, data, and resolve of the componentless parent into the parameters, data, and resolve of the children.

[{
   path: 'parent/:id',
   children: [
     { path: 'a', component: MainChild },
     { path: 'b', component: AuxChild, outlet: 'aux' }
   ]
}]

=>empty path with some component
By setting 'path' to an empty string, we can create a route that instantiates a component but does not "consume" any URL segments.
You can go for an empty path when its not really needed. Navigating to team/10 will automatically render the list of users in that team. You don't need to go to team/10/users to get the list of users in that team. But obviously to get the detail of a user in the team you need team/10/user/bob.
[ { path: 'team/:id', component: TeamComponent, children: [ { path: '', component: AllUsersComponent }, { path: 'user/:name', component: UserComponent } ] } ]

https://vsavkin.tumblr.com/post/146722301646/angular-router-empty-paths-componentless-routes


1. /users ---> will take me to UsersComponent
2. /users/10 --->will take me to UserDetailComponent.

Using the ActivatedRoute, I can access the user id in the params to get all details related to the
user

```this.activeRoute.snapshot.params```
will only give me the params of the current route when the component is instntiated.
Component instantiates only once.
If the params change later, the component will be activated and not instantiated. In that case the observable approach works.

```
 this.activeRoute.params.subscribe((result:any)=>{
      console.log(result); //this will execute the first time and also every time the component activates.
      this.userId=result.userId;
    })
```

3. /users/10/todos ---> will take me to the ToDosComponent.
I want to fetch all the todos connected to this user in this component.
Since UserDetailComponent is the parent of ToDosComponent, I can access the params
of the parent route of the current activated route to get the user id.
Using the user id I can fetch the todos.

We are fetching the todos everytime the params of the parent route changes.

``` 
this.activeRoute.parent?.params.subscribe((result:any)=>{
      console.log(result); //this will execute the first time and also every time the component activates.
      this.userId=result.userId;
      this.fetchToDos();
    }) 
```

4. Can I add a queryParam to /users/10/todos route ? Yes since these are optional, you dont have to define
them in the routing module.

I can give an option to fetch either completed or non-completed todos.

In the UserDetailComponent, I have given a button to navigate to /users/10/todos?completed=false or
/users/10/todos?completed=true

Using the radio buttons, I can switch the value of the completed query param.

```
<button [routerLink]="['todos']" [queryParams]="{'completed': completed === 'yes'? true: false}">Get the todos</button>

Completed<input type="radio" name="status" value="yes" [(ngModel)]="completed">
Not Completed<input type="radio" name="status" value="no" [(ngModel)]="completed">


<router-outlet></router-outlet>

```

5. Accessing the queryParam in the ToDosComponent.

I want to fetch the todos, when the user Id in the parent route params or the completed query param
in the current route changes.

```
  combineLatest([ this.activeRoute.parent?.params, this.activeRoute.queryParams]).subscribe(([result]:any[])=>{
      console.log(result);
      this.userId=result.userId;
      this.fetchToDos();
    })

    fetchToDos(){
    this.todos$=this.usersService.fetchToDosOfUser(this.userId,
      this.activeRoute.snapshot.queryParams["completed"]);
  }


```

6.The default path-match strategy is 'prefix', which means that the router checks URL elements from the left to see if the URL matches a specified path. You can specify the path-match strategy 'full' to make sure that the path covers the whole unconsumed URL. It is important to do this when redirecting empty-path routes. Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when navigating to the redirect destination, creating an endless loop.

7.The following route uses wild-card notation to specify a component that is always instantiated regardless of where you navigate to. You can use it for 404 use-case.

[{
  path: '**',
  component: WildcardComponent
}]

8. When you want multiple components on the same screen using routing, you need to go for multiple named
router outlets.
In addition to the primary outlet, we can have 1 or more outlets with a name attribute to differentiate
between the outlets.

Eg: comout is a named router outlet where I will load a CommentsComponent with path "com".
 {
                    path:"com",
                    component:CommentsComponent, //give an option to show the comments for the post
                    outlet:'comout'
}
I can also remove the component from the outlet with the 2nd button below.

<button [routerLink]="[{ outlets: { comout: 'com' } }]">Load comments</button>
<button [routerLink]="[{ outlets: { comout:null } }]">Close Comments</button>

<router-outlet name="comout"></router-outlet>
