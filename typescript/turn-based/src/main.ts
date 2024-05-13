import { GameObject } from "./game-object";
import { Skill1 } from "./skill";

function main() {
    const g1 = new GameObject('e1');
    const g2 = new GameObject('e2');
    const skill1 = new Skill1(g1.entity, g2.entity);
    skill1.execute();
}

main();
