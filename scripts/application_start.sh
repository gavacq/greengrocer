#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/greengrocer

#navigate into our working directory where we have all our github files
cd /home/ec2-user/greengrocer

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules for react app
# npm install

# install node modules for server
# cd server && npm install
# cd ..

#start our node app in the background. prod script installs modules automatically
# npm run prod > app.out.log 2> app.err.log < /dev/null & 

# start the app with pm2
pm2 start --name greengrocer npm -- run prod --