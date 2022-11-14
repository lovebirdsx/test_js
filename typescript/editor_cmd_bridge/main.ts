import { Worker } from 'worker_threads';

const seprateThread = new Worker(__dirname + "/editor_cmd_bridge.js");
