import { Buffer } from "buffer"

import * as Apdu from "./apdu";
import * as Bip44 from "./bip44";

    export function getVersionInstruction(): string {
        return new Apdu.Builder(
            Apdu.Flag.CLA,
            Apdu.Flag.INS_GET_VERSION,
            Apdu.Flag.P1_NON_CONFIRM,
            Apdu.Flag.P2_NO_CHAINCODE,
        ).getInstruction().toString();
    }

    export function getPublicKeyInstruction(path: string): string {
        return new Apdu.Builder(
            Apdu.Flag.CLA,
            Apdu.Flag.INS_GET_PUBLIC_KEY,
            Apdu.Flag.P1_NON_CONFIRM,
            Apdu.Flag.P2_NO_CHAINCODE,
            Bip44.Path.fromString(path).toBytes(),
        ).getInstruction().toString();
    }

    export function getExtPublicKeyInstruction(path: string): string {
        return new Apdu.Builder(
            Apdu.Flag.CLA,
            Apdu.Flag.INS_GET_PUBLIC_KEY,
            Apdu.Flag.P1_NON_CONFIRM,
            Apdu.Flag.P2_CHAINCODE,
            Bip44.Path.fromString(path).toBytes(),
        ).getInstruction().toString();
    }

    export function getMessageInstruction(path: string, message: string): string {
		if (!path || !message) {
			throw  new Error("Message and signing path must not be empty!");
		}

       checkMessageFormat(message);

        return new Apdu.Builder(
            Apdu.Flag.CLA,
            Apdu.Flag.INS_SIGN_MESSAGE,
            Apdu.Flag.P1_SINGLE,
            Apdu.Flag.P2_SCHNORR_LEG,
            Buffer.concat([Bip44.Path.fromString(path).toBytes(),  Buffer.concat(Buffer.from(message))]),
        ).getInstruction().toString().split('/(e0)/');
    }

    export function getTransactionInstruction(path: string, payload: string): string {
		if (!path || !payload) {
			throw  new Error("Transaction and signing path must not be empty!");
		}
		
		return new Apdu.Builder(
            Apdu.Flag.CLA,
            Apdu.Flag.INS_SIGN_TRANSACTION,
            Apdu.Flag.P1_SINGLE,
            Apdu.Flag.P2_SCHNORR_LEG,
            Buffer.concat([Bip44.Path.fromString(path).toBytes(),
						   Buffer.concat(Buffer.from(payload, "hex"))]),
        ).getInstruction().toString().split('/(e0)/');
    }

    function checkMessageFormat(message: string) {
        const REGEXP_INVALID_MESSAGE: string = "[^\x00-\x7F]";
        if (message.match(new RegExp(REGEXP_INVALID_MESSAGE, "g"))) {
            throw new Error("message contains invlaid text");
        }
    }
