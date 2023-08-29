const { log } = require("console")

const lines = [
    '[a][b][c]',
    '[a][b][c][d]',
    '[a]',
    '[2023.08.29-10.31.32:023][187][GameThread]LogInit:  - BufferSize = 65536'
]

for (const line of lines) {
    console.log(line.match(/\[.+\]\[.+\]\[.+\]/))
}
