import {intakeReasons,personalSafetyLine,reasonForQuestion} from '../copy';
export function WhyAsk({field='default',question,personal=false}:{field?:keyof typeof intakeReasons;question?:string;personal?:boolean}) {return <span className="input-hint why-ask">{question?reasonForQuestion(question):intakeReasons[field]}{personal&&<span className="input-safety">{personalSafetyLine}</span>}</span>;}
