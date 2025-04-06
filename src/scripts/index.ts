import { PropertyService } from "./utils/PropertyService.js";
import { Router } from "./utils/Router.js";
PropertyService.getProperties().then(() => Router.init());
