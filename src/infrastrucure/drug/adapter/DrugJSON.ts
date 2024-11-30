import { AdministrationProcedureJSON } from '../../administration_procedure/AdministrationProcedureJSON'
import { RamJSON } from '../../ram/RamJSON'

export interface DrugJSON {
	name: string
	presentation: string
	description: string
	rams: Array<RamJSON>
	administration_procedures: Array<AdministrationProcedureJSON>
}
