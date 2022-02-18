import React, { useState } from "react";
import './App.css'

import {
	getVersionInstruction,
	getPublicKeyInstruction,
	getExtPublicKeyInstruction,
	getMessageInstruction,
	getTransactionInstruction
} from "./utils/ark";
import imageSrc from './assets/header.svg';

export default function App() {
	const defaultPath = "44'/1'/0'/0/0";
	const defaultTransaction = "ff0217010000000400020000000000000003b593aa66b53525c5399b4af5a4f583dede1c2a46176c6796a7284ee9c0a1167f0094357700000000000210037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff663901037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150004495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0171d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b02d44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f034495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0471d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b05d44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f064495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0771d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b08d44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f094495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0a71d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b0bd44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f0c4495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0d4495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0e71d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b0fd44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f";

	const [version, setVersion] = useState("");

	const [pubKey, setPubKey] = useState("");
	const [pubKeyPath, setPubKeyPath] = useState("");

	const [extPubKey, setExtPubKey] = useState("");
	const [extPubKeyPath, setExtPubKeyPath] = useState("");

	const [message, setMessage] = useState("");
	const [messagePath, setMessagePath] = useState("");
	const [messageResult, setMessageResult] = useState("");

	const [tx, setTx] = useState("");
	const [txPath, setTxPath] = useState("");
	const [txResult, setTxResult] = useState("");

	function handleGetVersion() {
		try {
			const ins = getVersionInstruction();
			setVersion(ins);
		} catch (e) {
			alert(e);
		}
	}

	function handleGetPubKey() {
		try {
			const ins = getPublicKeyInstruction(pubKeyPath);
			setPubKey(ins);
			setPubKeyPath("");
		} catch (e) {
			alert(e);
		}
	}

	function handleGetExtPubKey() {
		try {
			const ins = getExtPublicKeyInstruction(extPubKeyPath);
			setExtPubKey(ins);
			setExtPubKeyPath("");
		} catch (e) {
			alert(e);
		}
	}

	function handleMessage() {
		try {
			const ins = getMessageInstruction(messagePath, message);
			setMessageResult(ins);
			setMessagePath("");
			setMessage("");
		} catch (e) {
			alert(e);
		}
	}

	function handleTx() {
		try {
			const ins = getTransactionInstruction(txPath, tx);
			setTxResult(ins);
			setTxPath("");
			setTx("");
		} catch (e) {
			alert(e);
		}
	}

	return (
		<main>
			<header className="page-header">
				<img src={imageSrc} alt="ark-header" />
				<h1 className="text-effect">ARK Ledger APDU Tool</h1>
			</header>

			<div className="version">
				<h2 className="text-effect">Version</h2>
				<button className="button-style"
						onClick={handleGetVersion}>
						Get Version Instruction
				</button>
				<input className={version}
					   defaultValue={version}
					   id="result"
					   placeholder={"result"}/>
			    </div>

			<div className="pubkey">
				<h2 className="text-effect">PublicKey</h2>
				<input className={pubKeyPath}
					   type="text"
					   placeholder={"Path: (e.g., \"44'/1'/0'/0/0\")"}
					   defaultValue={pubKeyPath}
					   onChange={e => setPubKeyPath(e.target.value)} />
				<button className="button-style-default"
					    onClick={e => setPubKeyPath(defaultPath)}>
					    Use Default
				</button>
				<button className="button-style"
						onClick={handleGetPubKey}>
						Get PublicKey Instruction
				</button>
				<textarea className={pubKey}
					      defaultValue={pubKey}
					      id="wide-result"
					      placeholder={"result"} />
			</div>

			<div className="ext-pubkey">
				<h2 className="text-effect">Ext. PublicKey</h2>
				<input className={extPubKeyPath}
					   type="text"
					   placeholder={"Path: (e.g., \"44'/1'/0'/0/0\")"}
					   defaultValue={extPubKeyPath}
					   onChange={e => setExtPubKeyPath(e.target.value)} />
				<button className="button-style-default"
					   onClick={e => setExtPubKeyPath(defaultPath)}>
					    Use Default
				</button>
				<button className="button-style"
						onClick={handleGetExtPubKey}>
						Get Ext. PublicKey Instruction
				</button>
				<textarea className={extPubKey}
					      defaultValue={extPubKey}
					      id="wide-result"
					      placeholder={"result"} />
			</div>
			
			<div className="message">
				<h2 className="text-effect">Message</h2>
				<input className={messagePath}
					   type="text"
					   placeholder={"Path: (e.g., \"44'/1'/0'/0/0\")"}
					   defaultValue={messagePath}
					   onChange={e => setMessagePath(e.target.value)} />
				<button className="button-style-default"
					    onClick={e => setMessagePath(defaultPath)}>
					    Use Default
				</button>
				<input className={message}
					   type="text"
					   id="wide-input"
					   placeholder={"Message: (e.g., \"All parts should go together without forcing. You must remember that the parts you are reassembling were disassembled by you. Therefore, if you can't get them together again, there must be a reason. By all means, do not use a hammer. ~ IBM Manual - (1975)\")"}
						  defaultValue={message}
						  onChange={e => setMessage(e.target.value)} />
				<button className="button-style-default"
					   onClick={e => setMessage("All parts should go together without forcing. You must remember that the parts you are reassembling were disassembled by you. Therefore, if you can't get them together again, there must be a reason. By all means, do not use a hammer. ~ IBM Manual - (1975)")}>
					    Use Default
				</button>
				<button className="button-style"
					    onClick={handleMessage}>
					    Get Message Instruction
				</button>
				<textarea className={messageResult}
					      id="wide-result"
						  placeholder={"result"}
						  defaultValue={messageResult} />
			</div>

			<div className="transaction">
				<h2 className="text-effect">Transaction</h2>
				<input className={txPath}
					   type="text"
					   placeholder={"Path: (e.g., \"44'/1'/0'/0/0\")"}
					   defaultValue={txPath}
					   onChange={e => setTxPath(e.target.value)} />
				<button className="button-style-default"
					   onClick={e => setTxPath(defaultPath)}>
					    Use Default
				</button>
				<input className={tx}
					   type="text"
					   id="wide-input"
					   placeholder={"Transaction: (e.g., ff0217010000000400020000000000000003b593aa66b53525c5399b4af5a4f583dede1c2a46176c6796a7284ee9c0a1167f0094357700000000000210037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff663901037eaa8cb236c40a08fcb9d6220743ee6ae1b5c40e8a77a38f286516c3ff6639010301fd417566397113ba8c55de2f093a572744ed1829b37b56a129058000ef7bce0209d3c0f68994253cee24b23df3266ba1f0ca2f0666cd69a46544d63001cdf150004495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0171d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b02d44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f034495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0471d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b05d44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f064495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0771d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b08d44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f094495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0a71d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b0bd44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f0c4495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0d4495d593cfb8be3293e2473acf504870d2dcf71dbee7620270e136ed63c5eef259099d225f7866178968f0c3581509d92d902914674c8f86b99eb55aaa97586e0e71d86f3f6552b237dd81272a7b0da7718c4d26682255223dcf1928174082ce72b07218162938c674afe741119650135338eb3da159e0626ddab6b7851882e08b0fd44d9bde77c9ea02d3516ab3263a77f4f9fbb90c30b47eba7a8bb87325edeb78dd69f914f28426e6ff661c4bc001f253130f4e7eb092a9131c8ca69dbfaff32f)"}
						  defaultValue={tx}
						  onChange={e => setTx(e.target.value)} />
				<button className="button-style-default"
					    onClick={e => setTx(defaultTransaction)} >
					    Use Default
				</button>
				<button className="button-style"
						onClick={handleTx}>
					Get Transaction Instruction
				</button>
				<textarea className={txResult}
					      id="wide-result"
						  placeholder={"result"}
						  defaultValue={txResult} />
			</div>
		</main>
	)
}
