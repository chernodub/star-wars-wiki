/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import * as express from 'express';
import { join } from 'path';
import 'zone.js/dist/zone-node';

/** localStorage polyfill */
class Storage extends Map<string, string> {
  constructor() {
    super();
  }

  /**
   * value = storage[key]
   */
  public getItem(key: string): string | null {
    return super.get(key) || null;
  }

  /**
   * storage[key] = value
   */
  public setItem(key: string, value: string): void {
    super.set(key, value);
  }

  /**
   * delete storage[key]
   */
  public removeItem(key: string): void {
    super.delete(key);
  }

  /**
   * Returns the number of key/value pairs currently present in the list associated with the
   * object.
   */
  get length(): number {
    return super.keys.length;
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  public clear(): void {
    super.clear();
  }
}
global['localStorage'] = new Storage();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap,
} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  }),
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// App.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  }),
);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
