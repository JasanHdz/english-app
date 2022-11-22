export interface IVerb {
    image:          string
    continuosForm:  string
    baseForm:       string
    passTense:      string
    suffix:         string
    passParticiple: string
    spanish:        string
    
    isFlipped?:      boolean
    isFreeze?:       boolean
    type:           'image' | 'baseForm'
}