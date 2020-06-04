import cluster from 'cluster';
import os from 'os';
import worker from './worker';

if (process.env.NODE_ENV == 'production') {
  let CPUCount = os.cpus.length;
  if (cluster.isMaster) {
    master();
  } else {
    worker();
  }
  function master() {
    for (var i = 0; i < CPUCount; i++) cluster.fork();
    cluster.on('disconnect', (worker) => {
      console.warn(`Worker ${worker.id} died`);
      cluster.fork();
    });
    cluster.on('online', (worker) => {
      console.info(`Worker ${worker.id} start`);
    });
  }
} else {
  worker();
}
