export function SampleFieldLabel({htmlFor,label,onFill,disabled=false}:{htmlFor:string;label:string;onFill?:()=>void;disabled?:boolean}){
 const fieldLabel=<label htmlFor={htmlFor}>{label}</label>;
 if(!onFill)return fieldLabel;
 return <div className="sample-field-label">{fieldLabel}<button type="button" className="button button-secondary sample-fill" disabled={disabled} aria-label={`Fill sample for ${label}`} onClick={onFill}>Fill sample</button></div>;
}
