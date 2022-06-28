import { useEffect } from "react"
import { useMoralis } from 'react-moralis'
import { getLocalStorageValue, maskAddress, removeLocalStoragevalue, updateLocalStorage } from "../utils/helperFunc"


const ManualHeader = () => {
	const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

	const onConnect = async () => {
		await enableWeb3()
		updateLocalStorage("connected", "injected")
	}

	useEffect(() => {
		if (!isWeb3Enabled) {
			if (getLocalStorageValue("connected")) {
				console.log("Trying to connect")
				enableWeb3()
			}
		}
	}, [isWeb3Enabled, enableWeb3])

	useEffect(() => {
		Moralis.onAccountChanged((account) => {
			if (account === null) {
				removeLocalStoragevalue("connected")
				deactivateWeb3()
			}

		})
	}, [Moralis, deactivateWeb3])

	return (
		<div>
			{account ? <div>Connected to {maskAddress(account)}</div> : (

				<button onClick={onConnect} disabled={isWeb3EnableLoading}>{isWeb3EnableLoading ? "Loading..." : "Connect"}</button>
			)}
		</div>
	)
}
export default ManualHeader