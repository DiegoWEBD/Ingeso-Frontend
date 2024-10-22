import AdministrationProcedure from '../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../domain/drug/Drug'
import DrugClassification from '../../../domain/drug_classification/DrugClassification'
import Ram from '../../../domain/ram/Ram'

export default class DrugAdapter {
	private constructor() {}

	static FromRestApi(drug: any): Drug {
		return new Drug(
			drug.name,
			drug.description,
			drug.drug_classifications.map(
				(drug_classification: any) =>
					new DrugClassification(
						drug_classification.classification,
						drug_classification.description
					)
			),
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
