interface Choice {
    name: string;
    state: boolean;
}

interface Question {
    name: string;
    nPoints: number;
    choices: Choice[];
}

interface Game {
    id: string;
    name: string;
    description: string;
    time: number;
    questions: Question[];
    lastModification: string;
    visible?: boolean;
}

export { Choice, Game, Question };
