FROM cypress/browsers:node-24.13.0-chrome-143.0.7499.192-1-ff-147.0-edge-143.0.3650.139-1
WORKDIR /e2e

# Install the application dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy in the source code
COPY . .
CMD ["npm", "run", "test1"]