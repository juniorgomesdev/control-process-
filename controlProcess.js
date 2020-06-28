module.exports = async (processData) => {

	/*
		proccess é um sistema para auxiliar na manutenção do código e deixar o
		ambiente do controle limpo.

		Ele gerencia seus estados de ciclos da rota, as funções podem ser de-
		claradas da maneira que o programador julgar melhor.

		As funções são execultadas respectivamente a sua declaração no objeto,
		e sempre devem retornar o objeto data, na qual vem de primeira no mes-
		mo objeto das funções.
	*/

	// data representa os vindos do cliente

	const { data } = processData

	/* dataHistory tem a função de armazenar o historico de mutação dos dados
	a cada função execultada no processo */
	const dataHistory = [data]
	let i = 0

	const error = (msg, statusCode=200) => {
		return {
			error: msg,
			statusCode,
		}
	}

	for(let att in processData) {
		let valid = typeof processData[att] == 'function'

		if(valid) {
			let funcReturn = await processData[att](dataHistory[i])

			/* se o retorno da função de controle houver um error, o mesmo
			deve ser retornado ao cliente */
			if(funcReturn.error) {
				return error(funcReturn.error, funcReturn.statusCode)
			}

			dataHistory.push(funcReturn)
			i++
		}
	}

	return dataHistory[i]
}

