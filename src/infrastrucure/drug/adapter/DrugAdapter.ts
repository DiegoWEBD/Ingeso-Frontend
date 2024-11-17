import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import Ram from '../../../domain/ram/Ram'

export default class DrugAdapter {
	private constructor() {}

	static FromRestApi(drug: any): Drug {
		return new Drug(
			drug.name,
			drug.presentation,
			drug.description,
			drug.rams.map((ram: any) => new Ram(ram.reaction)),
			drug.administration_procedures.map(
				(administration_procedure: any) =>
					new AdministrationProcedure(
						administration_procedure.method,
						administration_procedure.procedure
					)
			)
		)
	}
}
