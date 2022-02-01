### Interceptors: 
- *AuthTokenInterceptor*: used for add the authorization key to request
- *ExpiredTokenInterceptor*: checks if token is expired and refreshes it
- *WrappingRemoverInterceptor*: removes default data wrapping for requests for Films, Characters, etc. (There is an issue with data on server. It holds all the data in some kind of wrapper where 'fields' is an object we're needed for. Ex: {pk: number, fields: Object, model: string})