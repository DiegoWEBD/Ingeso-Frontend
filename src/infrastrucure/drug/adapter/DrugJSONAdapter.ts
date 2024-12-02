import Drug from '../../../domain/drug/Drug'
import { AdministrationProcedureJSON } from '../../administration_procedure/AdministrationProcedureJSON'
import { RamJSON } from '../../ram/RamJSON'
import { DrugJSON } from './DrugJSON'

export default class DrugJSONAdapter implements DrugJSON {
	name: string
	presentation: string
	description: string
	rams: RamJSON[]
	administration_procedures: AdministrationProcedureJSON[]

	constructor(drug: Drug) {
		this.name = drug.getName()
		this.presentation = drug.getPresentation()
		this.description = drug.getDescription()
		this.rams = drug
			.getRams()
			.map((ram) => ({ reaction: ram.getReaction() }))
		this.administration_procedures = drug
			.getAdministrationProcedures()
			.map((administrationProcedure) => ({
				method: administrationProcedure.getMethod(),
				procedure: administrationProcedure.getProcedure(),
			}))
	}
}
