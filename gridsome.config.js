const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/*.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Gridsome',
  siteDescription: 'A WordPress starter for Gridsome',
  plugins: [
    {
      use: '~/src/plugins/wp-source/',
      options: {
        baseUrl: 'https://thoriumdesign.com/', // required - Replace me with your Wordpress URL 
        typeName: 'WordPress', // GraphQL schema name (Optional)
        perPage: 100, // How many posts to load from server per request (Optional)
        concurrent: 10, // How many requests to run simultaneously (Optional)
        routes: {
          post: '/:year/:month/:day/:slug', //adds route for "post" post type (Optional)
          post_tag: '/tag/:slug', // adds route for "post_tag" post type (Optional)
        },
        createPages: {
          approach: 'include', // include or exclude, default is include
          list: [
            'about',
            'our-mission',
            'team',
            'jorge-castellon-jr',
            'jarrett-tilford'
          ] //an array of page slugs to include or exclude, ex. ['about', 'our-team'], default is an empty array
        }
      }
    }
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
  afterBuild ({ redirects }) {
    for (const rule of redirects) {
      // rule.from   - The dynamic path
      // rule.to     - The HTML file path
      // rule.status - 200 if rewrite rule
    }
  }
}
