export interface Resultados {
    resultados: Resultado[];
}

export interface Resultado {
    HIS:          string;
    SampleID:number;
    TestID:       TestIDElement[];
    TechValDate?: Date;
    TechValHour?: string;
}

//export type TestIDUnion = TestIDElement[] | string;

export interface TestIDElement {
    TestID:       string;
    TechValDate?: Date;
    TechValHour?: string;
}
