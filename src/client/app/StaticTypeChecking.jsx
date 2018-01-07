/**
 * ---------------------
 * Static Type Checking
 * ---------------------
 * Static type checkers like Flow and TypeScript identify certain types of problems before you
 * even run your code. They can also improve developer workflow by adding features like
 * auto-completion. For this reason, we recommend using Flow or TypeScript instead of "PropTypes"
 * for larger code bases.
 */

/**
 * -----
 * Flow
 * -----
 * Flow is a static type checker for your JavaScript code. It is developed at Facebook and is
 * often used with React. It lets you annotate the variable, functions and React components
 * with a special type syntax, and catch mistakes early. 
 * To use Flow, you need to:
 * - Add Flow to your project as a dependency.
 * - Ensure that Flow syntax is stripped from the compiled code.
 * - Ad type annotations and run Flow to check them.
 */

/**
 * -----------------------------
 * Adding Flow Type Annotations
 * -----------------------------
 * By default, Flow only checks the files that include this annotation:
 *  @flow
 * 
 * Typically it ia placed at top of file. Try adding it some files in your project and run
 * "yarn flow" or "npm run flow" to see if Flow already found any issues.
 * There is also an option to force Flow to check all files regardless of the annotation. This
 * can be too noisy for existing projects, but is reasonable for a new project if you want to
 * fully type it with Flow.
 */

/**
 * -----------
 * TypeScript
 * -----------
 * TypeScript is programming language developed by Microsoft. It is typed superset of JavaScript,
 * and includes its own compiler. Being a typed language, TypeScript can catch errors and bugs 
 * at build time, long before your app goes live. 
 * 
 * To use TypeScript, you need to:
 * - Add TypeScript as a dependency to your project.
 * - Configure the TypeScript compiler options.
 * - Use the right file extensions.
 * - Add definitions for libraries you use.
 */

/**
 * --------------------------------
 * Configuring TypeScript Compiler
 * --------------------------------
 * The compiler is of no help to us until we tell it what to do. In TypeScript, these rules are
 * defined in a special file called tsconfig.json. To generate this file run:
 *      tsc --init
 * 
 * Looking at now generated tsconfig.json, you can see that there are many options you can
 * use to configure the compiler. Of the many options, we will look at "rootDir" and "outDir".
 * Now when you run our build script the compiler will output the generated javascript to
 * "build" folder. Generally, you don't want to keep the generated javascript in your source
 * control, so be sure to add the build folder to your .gitignore file.
 */

/**
 * ----------------
 * File extensions
 * ----------------
 * In React, you most likely write your components in a .js file. In TypeScript we have 2
 * file extensions: .ts is the default file extension while .tsx is a special extension
 * used for files which contain JSX.
 */

/**
 * -----------------
 * Type Definitions
 * -----------------
 * To be able to show errors and hints from other packages, the compiler relies on declaration
 * files. A declaration file provides all the type information about a library. This enables
 * us to use JavaScript libraries like those on npm in our project.
 * 
 * There are two main ways to get declarations for a library:
 * 
 * Bundled - The library bundles it's own declaration file. This is great for us, since all we
 *           need to do is install the library, and we can use it right away. To check if a
 *           library has bundled types, look for an index.d.ts file in the project. Some
 *           libraries will have it specified in their package.json under the "typings" or
 *           "types" field.
 * DefinitelyTyped - DefinitelyTyped is a huge repository of declarations for libraries that
 *                   don't bundle a declaration file. The declarations are crowd-sourced and
 *                   managed by Microsoft and open-source contributors. React doesn't bundle
 *                   it's own declaration file. Instead we can get it from DefinitelyTyped.
 *                   To do so enter this command in your terminal: 
 *  
 *                      yarn add --dev @types/react
 *  
 *                      npm - --save-dev @types/react
 * 
 * Local Declarations - Sometimes the package that you want to use doesn't bundle declarations nor
 *                      is it available on DefinitelyTyped. In that case, we can have a local
 *                      declaration file. To do this, create a declarations.d.ts file in the root of
 *                      your source directory.
 * 
 *                      declare module 'querystring' {
 *                          export function stringify(val: object): string
 *                          export function parse(val: string): object
 *                      }
 */

/**
 * ---------------------------------------
 * Using TypeScript with Create-React-App
 * ---------------------------------------
 * "react-scripts-ts" automatically configures a create-react-app project to support TypeScript.
 * You can use it like this:
 * 
 *      create-react-app my-app --scripts-version=react-scripts-ts
 * 
 * It is a third party project, and is not a part of Create React App.
 */

/**
 * -------
 * Reason
 * -------
 * Reason is not a new language; it's new syntax and toolchain powered by the battle-tested
 * language, OCaml. Reason gives OCaml a familiar syntax geared toward JavaScript programmers,
 * and caters to the existing NPM/Yarn workflow folks.
 * Reason is developed at Facebook, and is used in some of its products like Messenger. It
 * is still somewhat experimental but it has dedicated React bindings maintained by Facebook
 * and a vibrant community.
 */

/**
 * -------
 * Kotlin
 * -------
 * Kotlin is a statically typed language developed by JetBrains. Its target platforms include the
 * JVM, Android, LLVM and JavaScript.
 * JetBrains develops and maintains several tools specifically for the React community: React
 * bindings as well as Create React Kotlin App. The latter helps you start building React apps
 * with Kotlin with no build configuration.
 */