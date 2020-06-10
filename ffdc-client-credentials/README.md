### Welcome

This sample project shows how to obtain an access grant (in the form of a token) from the **Fusion**Fabric.cloud Authorization Server, using the OAuth2 client credentials grant flow, and how to use the access grant to request for resources exposed by the **Fusion**Fabric.cloud APIs.

**To run this sample**
1. Register an application on [**Fusion**Fabric.cloud Developer Portal](https://developer.fusionfabric.cloud), click on **APIs** block and  include the **Referential Data** API in the **APIs** tab.
2. Clone the current project.
3. Copy `.env.sample` to `.env`, and enter `<%YOUR-CLIENT-ID%>`, and `<%YOUR-SECRET-KEY%>` of the application created at the step 1.

> The `AUTHORIZATION_WELLKNOWN` is the URL of the [Discovery service](https://developer.fusionfabric.cloud/documentation/oauth2-grants#discovery-service) of the **Fusion**Fabric.cloud Developer Portal.   

4. (Optional) If you want to use private key authentication, instead of the standard authentication based on secret value, follow [the steps from the documentation](https://developer.fusionfabric.cloud/documentation/oauth2-grants#jwk-auth) to sign and upload a JSON Web Key to your application, and save the private RSA key in a file named **private.key**. Edit `.env` as follows:
+ remove or comment the line containing the secret value: 
```
# CLIENT_SECRET="<%YOUR-SECRET-KEY%>"
```
+ set `STRONG=True`

5. Install the dependencies and start the server:
```sh
$ npm install
$ npm start
```

6. Point your browser to http://localhost:3000. The home page of this sample application is displayed.
7. (Optional) On the home page, click **Get Data**. The output of the call to the `GET` **/countries** endpoint of the **Referential Data** API is displayed in the browser. 

> To learn how to create this sample project from scratch, follow the tutorial from [Developer Portal Documentation](https://developer.fusionfabric.cloud/documentation/sample-client-node). 