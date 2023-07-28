import { TargetLanguage } from "../TargetLanguage";
import { StringTypeMapping } from "../TypeBuilder";
import { Type, EnumType, ClassType, ClassProperty } from "../Type";
import { RenderContext } from "../Renderer";
import { Option, OptionValues, EnumOption, BooleanOption } from "../RendererOptions";
import { ConvenienceRenderer, ForbiddenWordsInfo } from "../ConvenienceRenderer";
import { Namer, Name, DependencyName } from "../Naming";
import { Sourcelike, MultiWord } from "../Source";
import { Transformer } from "../Transformers";
export type PythonFeatures = {
    typeHints: boolean;
    dataClasses: boolean;
};
export declare const pythonOptions: {
    features: EnumOption<PythonFeatures>;
    justTypes: BooleanOption;
    nicePropertyNames: BooleanOption;
};
export declare class PythonTargetLanguage extends TargetLanguage {
    protected getOptions(): Option<any>[];
    get stringTypeMapping(): StringTypeMapping;
    get supportsUnionsWithBothNumberTypes(): boolean;
    get supportsOptionalClassProperties(): boolean;
    needsTransformerForType(t: Type): boolean;
    protected makeRenderer(renderContext: RenderContext, untypedOptionValues: {
        [name: string]: any;
    }): PythonRenderer;
}
export declare class PythonRenderer extends ConvenienceRenderer {
    protected readonly pyOptions: OptionValues<typeof pythonOptions>;
    private readonly imports;
    private readonly declaredTypes;
    constructor(targetLanguage: TargetLanguage, renderContext: RenderContext, pyOptions: OptionValues<typeof pythonOptions>);
    protected forbiddenNamesForGlobalNamespace(): string[];
    protected forbiddenForObjectProperties(_: ClassType, _classNamed: Name): ForbiddenWordsInfo;
    protected makeNamedTypeNamer(): Namer;
    protected namerForObjectProperty(): Namer;
    protected makeUnionMemberNamer(): null;
    protected makeEnumCaseNamer(): Namer;
    protected get commentLineStart(): string;
    protected emitDescriptionBlock(lines: Sourcelike[]): void;
    protected get needsTypeDeclarationBeforeUse(): boolean;
    protected canBeForwardDeclared(t: Type): boolean;
    protected emitBlock(line: Sourcelike, f: () => void): void;
    protected string(s: string): Sourcelike;
    protected withImport(module: string, name: string): Sourcelike;
    protected withTyping(name: string): Sourcelike;
    protected namedType(t: Type): Sourcelike;
    protected pythonType(t: Type, _isRootTypeDef?: boolean): Sourcelike;
    protected declarationLine(t: Type): Sourcelike;
    protected declareType<T extends Type>(t: T, emitter: () => void): void;
    protected emitClassMembers(t: ClassType): void;
    protected typeHint(...sl: Sourcelike[]): Sourcelike;
    protected typingDecl(name: Sourcelike, type: string): Sourcelike;
    protected typingReturn(type: string): Sourcelike;
    protected sortClassProperties(properties: ReadonlyMap<string, ClassProperty>, propertyNames: ReadonlyMap<string, Name>): ReadonlyMap<string, ClassProperty>;
    protected emitClass(t: ClassType): void;
    protected emitEnum(t: EnumType): void;
    protected emitImports(): void;
    protected emitSupportCode(): void;
    protected emitClosingCode(): void;
    protected emitSourceStructure(_givenOutputFilename: string): void;
}
export type ConverterFunction = "none" | "bool" | "int" | "from-float" | "to-float" | "str" | "to-enum" | "list" | "to-class" | "dict" | "union" | "from-datetime" | "from-stringified-bool" | "is-type";
export type ValueOrLambda = {
    value: Sourcelike | undefined;
    lambda?: MultiWord;
};
export declare class JSONPythonRenderer extends PythonRenderer {
    private readonly _deserializerFunctions;
    private readonly _converterNamer;
    private readonly _topLevelConverterNames;
    private _haveTypeVar;
    private _haveEnumTypeVar;
    private _haveDateutil;
    protected emitTypeVar(tvar: string, constraints: Sourcelike): void;
    protected typeVar(): string;
    protected enumTypeVar(): string;
    protected cast(type: Sourcelike, v: Sourcelike): Sourcelike;
    protected emitNoneConverter(): void;
    protected emitBoolConverter(): void;
    protected emitIntConverter(): void;
    protected emitFromFloatConverter(): void;
    protected emitToFloatConverter(): void;
    protected emitStrConverter(): void;
    protected emitToEnumConverter(): void;
    protected emitListConverter(): void;
    protected emitToClassConverter(): void;
    protected emitDictConverter(): void;
    protected emitUnionConverter(): void;
    protected emitFromDatetimeConverter(): void;
    protected emitFromStringifiedBoolConverter(): void;
    protected emitIsTypeConverter(): void;
    protected emitConverter(cf: ConverterFunction): void;
    protected conv(cf: ConverterFunction): Sourcelike;
    protected convFn(cf: ConverterFunction, arg: ValueOrLambda): ValueOrLambda;
    protected typeObject(t: Type): Sourcelike;
    protected transformer(inputTransformer: ValueOrLambda, xfer: Transformer, targetType: Type): ValueOrLambda;
    protected deserializer(value: ValueOrLambda, t: Type): ValueOrLambda;
    protected serializer(value: ValueOrLambda, t: Type): ValueOrLambda;
    protected emitClassMembers(t: ClassType): void;
    protected emitImports(): void;
    protected emitSupportCode(): void;
    protected makeTopLevelDependencyNames(_t: Type, topLevelName: Name): DependencyName[];
    protected emitDefaultLeadingComments(): void;
    protected emitClosingCode(): void;
}
