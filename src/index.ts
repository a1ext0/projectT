import cluster from 'cluster';
import os from 'os';

let numCPUs: number = os.cpus.length;
let env = process.env.NODE_ENV
let CPUCount = 1;

if (env == 'production') {
  CPUCount = numCPUs;
}

class ClusterCounter {
  interval = 1000;
  startCount = 0;
  allowCount = 10;
  allowStart = true;
  count() {
    this.startCount++
  }
  //Проверка количества запусков за период, отмена запуска, если превышен
  intervalCount() {
    setInterval.call(this, ()=> {
      if (this.startCount > this.allowCount) {
        this.allowStart = false
      }
      this.startCount = 0
    }, this.interval)
  }
}

if (cluster.isMaster) {
  master()
} else {
  require('./worker');
}

function master () {
  const clusterCounter = new ClusterCounter;

  clusterCounter.intervalCount();

  for (var i=0; i < CPUCount; i++) cluster.fork();


  cluster.on('disconnect', worker=> {
    console.warn(`Worker ${worker.id} died`);
    if (clusterCounter.allowStart) {
      cluster.fork();
    }
  });
  cluster.on('online', worker=> {
    clusterCounter.count();
    console.info(`Worker ${worker.id} start`);
  });
}
