import { log } from 'console';
import { TextCsvPool } from './text_csv_pool';

function main() {
    const pool = TextCsvPool.instance;
    log(pool.toString());
}

main();
