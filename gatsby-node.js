var path = require("path")
const { readdirSync } = require("fs")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // Function to get all sub directories
  const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

  // Get all galeries folder
  const galleries = getDirectories(path.resolve(`./src/gallery/`))

  // Create the node data
  const data = {
    key: 516951,
    names: galleries,
  }

  const nodeMeta = {
    id: createNodeId(`gallery-${data.key}`),
    parent: null,
    children: [],
    internal: {
      type: `Gallery`,
      mediaType: `text/html`,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  }

  const node = Object.assign({}, data, nodeMeta)
  createNode(node)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      gallery {
        names
      }
    }
  `)

  // Crete page for each gallery
  result.data.gallery.names.forEach(name => {
    createPage({
      path: "/gallery/" + name,
      component: path.resolve(`./src/templates/gallery.js`),
      context: {
        gallery: name,
      },
    })
  })

  // Redirect home page to gallery
  const { createRedirect } = actions

  createRedirect({
    fromPath: `/`,
    toPath: `/gallery/cats`,
    redirectInBrowser: true,
    isPermanent: true,
  })
}
