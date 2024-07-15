import * as fs from 'fs';
import * as TJS from 'typescript-json-schema';

const settings: TJS.PartialArgs = {
  /** 生成必选字段 */
  required: true,

  /** 不允许额外字段 */
  noExtraProps: true,
};

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

function gen(options: { files: string[], types: string[], outDir: string }) {
  const { files, types, outDir } = options;
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const program = TJS.getProgramFromFiles(files, compilerOptions);
  for (const type of types) {
    const schema = TJS.generateSchema(program, type, settings);
    fs.writeFileSync(`${outDir}/${type}.json`, JSON.stringify(schema, null, 2));
  }
}

function main() {
  gen(
    {
      files: [
        'types/common.d.ts',
        'types/action.d.ts',
        'types/entity.d.ts',
        'types/quest.d.ts'
      ],
      types: [
        'TAction',
        'IEntity',
        'IQuest'
      ],
      outDir: 'schema'
    });
}

main();
