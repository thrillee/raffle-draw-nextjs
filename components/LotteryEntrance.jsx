import { useWeb3Contract } from 'react-moralis'
import { ethers } from 'ethers'

import { abi, contractAddresses } from "../constants"

import { useMoralis } from "react-moralis"
import { useCallback, useEffect, useState } from "react"
import { useNotification } from "web3uikit"

const LotteryEntrance = () => {
	const [entranceFee, setEntranceFee] = useState("0")
	const [numPlayer, setNumPlayers] = useState("0")
	const [recentWinners, setRecentWinners] = useState("0")
	const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
	const chainId = parseInt(chainIdHex)
	const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

	const dispatch = useNotification()

	const {
		runContractFunction: enterRaffle,
		data: enterTxResponse,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: raffleAddress,
		functionName: "enterRaffle",
		msgValue: entranceFee,
		params: {},
	})


	const { runContractFunction: getEntranceFee } =
		useWeb3Contract({
			abi: abi,
			contractAddress: raffleAddress,
			functionName: "getEntranceFee",
			params: {}
		});

	const { runContractFunction: getNumberOfPlayer } =
		useWeb3Contract({
			abi: abi,
			contractAddress: raffleAddress,
			functionName: "getNumberOfPlayer",
			params: {}
		});

	const { runContractFunction: getRecentWinner } =
		useWeb3Contract({
			abi: abi,
			contractAddress: raffleAddress,
			functionName: "getRecentWinner",
			params: {}
		});

	const handleSuccess = async (tx) => {
		await tx.wait(1)
		handleNotification()
		updateUI()
	}

	const handleNotification = () => {
		dispatch({
			type: "info",
			message: "Transaction completed",
			"title": "Tx notification",
			"position": "topR",
			"icon": "bell"
		})
	}

	const onEntrance = async () => {
		await enterRaffle({
			onSuccess: handleSuccess,
			onError: (e) => console.log(e)
		})
	}

	const updateUI = useCallback(async () => {
		const entranceFeeFromContract = (await getEntranceFee()).toString()
		const numPlayersFromCall = (await getNumberOfPlayer()).toString()
		const recentWinnerFromCall = await getRecentWinner()
		setEntranceFee(entranceFeeFromContract)
		setNumPlayers(numPlayersFromCall)
		setRecentWinners(recentWinnerFromCall)
	}, [getEntranceFee, getNumberOfPlayer, getRecentWinner])

	useEffect(() => {
		if (isWeb3Enabled) {
			updateUI()
		}
	}, [isWeb3Enabled, updateUI])

	return (
		<div className="p-5">

			<h3>Thrillee says hello...</h3>
			{raffleAddress ? (
				<>
					<button
						className="bg-blue-500 rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4"
						disabled={isFetching || isLoading}
						onClick={onEntrance}>
						{isLoading || isFetching ? (
							<div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
						) : 'Join Raffle'}
					</button>
					<div>
						<p>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")}</p>
						<p>Number of players: {numPlayer}</p>
						<p>Recent winner: {recentWinners}</p>
					</div>
				</>
			) : (
				<h3>Networt not supported</h3>
			)}
		</div>
	)
}

export default LotteryEntrance