module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    // plugins: [
    // 	[
    // 		"module-resolver",
    // 		{
    // 			extensions: [".js", ".jsx", ".ts", ".tsx"],
    // 			root: ["./src"],
    // 			alias: {
    // 				components: "./src/components",
    // 				graphql: "./src/graphql",
    // 				interfaces: "./src/interfaces",
    // 				navigation: "./src/navigation",
    // 				providers: "./src/providers",
    // 				screens: "./src/screens",
    // 				services: "./src/services",
    // 				store: "./src/store",
    // 				utils: "./src/utils",
    // 			},
    // 		},
    // 	],
    // ],

    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ]
  }
}
