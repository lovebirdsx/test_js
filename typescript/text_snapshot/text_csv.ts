import { ITextItem } from './types';

export class TextCsv {
    constructor(public name: string, public items: ITextItem[] = []) {
    }

    toString() {
        const results = [this.name];
        for (const item of this.items) {
            results.push(`  ${item.id}, ${item.text}`);
        }
        return results.join('\n');
    }

    add(id: string, text: string) {
        if (this.items.find((item) => item.id === id)) {
            throw new Error(`id ${id} already exists`);
        }
        this.items.push({ id, text });
    }

    remove(id: string) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index >= 0) {
            const item = this.items.splice(index, 1);
            return item[0];
        }
        return undefined;
    }

    modify(id: string, text: string) {
        const item = this.items.find((item) => item.id === id);
        if (item) {
            const originText = item.text;
            item.text = text;
            return originText;
        }
        return undefined;
    }
}

abstract class TextCsvCommand {
    abstract undo(): void;
    abstract redo(): void;
}

class AddCommand extends TextCsvCommand {
    constructor(private csv: TextCsv, private id: string, private text: string) {
        super();
    }

    undo() {
        this.csv.remove(this.id);
    }

    redo() {
        this.csv.add(this.id, this.text);
    }
}

class RemoveCommand extends TextCsvCommand {
    private item: ITextItem | undefined;

    constructor(private csv: TextCsv, private id: string) {
        super();
    }

    undo() {
        if (this.item) {
            this.csv.add(this.item.id, this.item.text);
        }
    }

    redo() {
        this.item = this.csv.remove(this.id);
    }
}

class ModifyCommand extends TextCsvCommand {
    private originText: string | undefined;

    constructor(private csv: TextCsv, private id: string, private text: string) {
        super();
    }

    undo() {
        if (this.originText !== undefined) {
            this.csv.modify(this.id, this.originText);
        }
    }

    redo() {
        this.originText = this.csv.modify(this.id, this.text);
    }
}

export class TextCsvSnapshoter {
    private commands: TextCsvCommand[] = [];
    private indexInSs: number = -1;

    constructor(private csv: TextCsv) {
    }

    private addCommand(command: TextCsvCommand) {
        // 新的命令，删除当前位置之后的命令
        if (this.indexInSs < this.commands.length - 1) {
            this.commands.splice(this.indexInSs + 1);
        }

        command.redo();
        this.commands.push(command);
        this.indexInSs = this.commands.length - 1;
        return this.indexInSs;
    }

    add(id: string, text: string) {
        return this.addCommand(new AddCommand(this.csv, id, text));
    }

    remove(id: string) {
        return this.addCommand(new RemoveCommand(this.csv, id));
    }

    modify(id: string, text: string) {
        return this.addCommand(new ModifyCommand(this.csv, id, text));
    }

    undo() {
        if (this.indexInSs < 0) {
            return;
        }

        this.commands[this.indexInSs].undo();
        this.indexInSs--;
    }

    redo() {
        if (this.indexInSs >= this.commands.length - 1) {
            return;
        }

        this.indexInSs++;
        this.commands[this.indexInSs].redo();
    }

    apply(id: number) {
        if (id < 0 || id >= this.commands.length) {
            return;
        }

        while (this.indexInSs > id) {
            this.undo();
        }
        while (this.indexInSs < id) {
            this.redo();
        }
    }
}
