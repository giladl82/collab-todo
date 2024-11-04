# My Collaborative todo project

> Please note that this is my first Vue.js project. 

## Features
The application is basically a collaborative  todo tasks list (for the same "account" on different devices/browsers).

Where the user can add new task and update its status be dragging and dropping it between the different status lists (Todo, In Progress, Done).

What makes this application collaborative is the use of [Yjs](https://docs.yjs.dev/) (a high-performance CRDT `Conflict-free Replicated Data Types` implementation for building collaborative applications that sync automatically) and [Hocuspocus](https://hocuspocus.io/) WebSockets.

In addition I implemented a very (very very) basic authentication system. Just so I can implement different collaborative list for different users.

## How to use

- Download the project
- Install dependencies
- Run the server
- Run the client

## Things to be done
~~I would like to replace the yjs implementation with [syncedstore](https://syncedstore.org/docs/). A library build on top of yjs to make it easier to use~~.

I already implemented the project using the [syncedstore](https://syncedstore.org/docs/) library. 
So I created a new branch named [Yjs](https://docs.yjs.dev/) and in it you can find the old implementation.


## License  
MIT License