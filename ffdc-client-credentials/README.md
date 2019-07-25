### Welcome

This sample project shows how to obtain a security grant (in form of a token) from the **Fusion**Fabric.cloud Authorization Server.

1. Register an application on [**Fusion**Fabric.cloud Developer Portal](https://developer.fusionfabric.cloud), and include the **Referential Data** API. Use `*` as the reply URL.
2. Clone the current project.
3. Copy `.env.sample` to `.env`, and enter `<%YOUR-CLIENT-ID%>`, and `<%YOUR-SECRET-KEY%>` of the application created at the step 1.

> The `AUTHORIZATION_WELLKNOWN` is the URL of the [Discovery service](https://developer.fusionfabric.cloud/documentation?workspace=FusionCreator%20Developer%20Portal&board=Home&uri=oauth2-grants.html#discovery-service) of the **Fusion**Fabric.cloud Developer Portal.   

4. Install the dependencies and start the server:
```sh
$ npm install
$ npm start
```

5. Point your browser to http://localhost:5000. The output of the call to the `GET` **/countries** endpoint of the **Referential Data** API is displayed in the browser. 

> To learn how to create this sample project from scratch, follow the tutorial from [Developer Portal Documentation](https://developer.fusionfabric.cloud/documentation?workspace=FusionCreator&board=Home&uri=sample-client-node.html). 

