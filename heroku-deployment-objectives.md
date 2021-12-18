# Heroku deployment objectives
1. Containerize app to run in docker container
   1. set up dockerfiles
   2. use `docker-compose`
2. Setup heroku docker build
   1. https://devcenter.heroku.com/articles/build-docker-images-heroku-yml
   2. need to reconcile heroku-deployment branch with main
3. Be able to deploy changes on heroku simply by pushing to production branch
   1. https://github.com/marketplace/actions/deploy-to-heroku#deploy-with-docker,
   2. https://github.com/marketplace/actions/deploy-to-heroku#set-stack-for-your-app
      1. don't need to set `usedocker` flag since `heroku.yml` will build our image for us
   3. https://github.com/AkhileshNS/heroku-deploy
4. Add custom domain https://devcenter.heroku.com/articles/custom-domains
5. websockets CORS issue
6. setup vscode devcontainer with linting