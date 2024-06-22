async function wait(ms: number) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

function outputPerformanceEntries(entries: PerformanceEntry[]) {
  const tableEntries = entries.map((entry) => ({
    name: entry.name,
    entryType: entry.entryType,
    duration: Math.floor(entry.duration),
    startTime: Math.floor(entry.startTime),
  }));

  console.table(tableEntries, ['name', 'entryType', 'startTime', 'duration']);
}

async function testPerformance() {
  performance.mark('test-start');

  for (let i = 0; i < 2; i++) {
    performance.mark('loop-start');
    // eslint-disable-next-line no-await-in-loop
    await wait(100);
    performance.mark('loop-end');
    performance.measure('loop', 'loop-start', 'loop-end');
  }

  performance.mark('test-end');
  performance.measure('test', 'test-start', 'test-end');

  outputPerformanceEntries(performance.getEntries());
  outputPerformanceEntries(performance.getEntriesByType('measure'));
}

testPerformance();
