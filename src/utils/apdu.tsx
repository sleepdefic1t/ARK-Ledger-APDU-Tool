import { Buffer } from "buffer";

/**
 * APDU Header Flags
 *
 * Describes the APDU Class, Instruction-Type, Parameter 1, and Parameter 2.
 *
 * APDU Header:  ({ CLA + INS + P1 + P2 })
 * - CLA:  Apdu Class
 * - INS:  Instruction Type
 * - P1:   Instruction Parameter 1
 * - P2:   Instruction Parameter 2
 *
 * Instruction Types:
 * - INS_GET_PUBLIC_KEY:    Get a PublicKey from a Ledger Device
 * - INS_GET_VERSION:       Get the ARK Application Version from a Ledger Device
 * - INS_SIGN_TRANSACTION:  Sign a Transaction using a Ledger Device
 * - INS_SIGN_MESSAGE:      Sign a Message using a Ledger Device
 *
 * App / PublicKey Context:
 * P1: User Approval
 * - P1_NON_CONFIRM:  Do NOT request user approval
 * - P1_CONFIRM:      Request user approval
 *
 * P2: ChainCode
 * - P2_NO_CHAINCODE:  Don't use a ChainCode
 * - P2_CHAINCODE:     Use a Chaincode
 *
 * Signing Context:
 * P1: Payload Segment
 * - P1_SINGLE:  N(1) where N === 1
 * - P1_FIRST:   N(1) where N > 1
 * - P1_MORE:    N(2)..N-1 where N > 2
 * - P1_LAST:    Nth where N > 1
 *
 * P2:
 * - P2_SCHNORR_LEG: Use Schnorr (bcrypto-v4.1.0) Signatures
 *
 */
export enum ApduFlag {
	/** APDU Class */
	CLA = 0xe0,

	/** App / PublicKey Context */
	INS_GET_PUBLIC_KEY = 0x02,
	INS_GET_VERSION = 0x06,

	P1_NON_CONFIRM = 0x00,
	P1_CONFIRM = 0x01,

	P2_NO_CHAINCODE = 0x00,
	P2_CHAINCODE = 0x01,

	/** Signing Context */
	INS_SIGN_TRANSACTION = 0x04,
	INS_SIGN_MESSAGE = 0x08,

	P1_SINGLE = 0x80,
	P1_FIRST = 0x00,
	P1_MORE = 0x01,
	P1_LAST = 0x81,

	P2_SCHNORR_LEG = 0x50,
}

export class Apdu {
	public readonly cla: number;
	public readonly ins: number;
	public readonly p1: number;
	public readonly p2: number;
	private readonly _payload: Buffer;

	private readonly CHUNK_MAX: number = 10;
	private readonly CHUNK_SIZE: number = 255;
	private readonly PAYLOAD_MAX: number = this.CHUNK_MAX * this.CHUNK_SIZE;

	public constructor(
		cla: number,
		ins: number,
		p1: number,
		p2: number,
		payload: Buffer = Buffer.alloc(0)
	) {
		if (payload && payload.length / 2 > this.PAYLOAD_MAX) {
			throw new Error("invalid payload length");
		}

		this.cla = cla;
		this.ins = ins;
		this.p1 = p1;
		this.p2 = p2;
		this._payload = payload;
	}

	public getInstruction(): string[] {
		const chunks = this.getChunks(this._payload, this.CHUNK_SIZE);

		const promises: string[] = [];
		let index = 0;
		for (const chunk of chunks) {
			promises.push(
				Buffer.concat([
					Buffer.from([
						this.cla,
						this.ins,
						this.getChunkSegmentFlag(index, chunks.length),
						this.p2,
					]),
					Buffer.from([chunk.length]),
					Uint8Array.from(chunk),
				]).toString("hex")
			);

			index += 1;
		}

		return promises;
	}

	protected getChunks(payload: Buffer, chunkSize: number): Buffer[] {
		return this._payload.length <= this.CHUNK_SIZE
			? [this._payload]
			: Array.from({ length: Math.ceil(payload.length / chunkSize) }, (v, i) =>
					payload.slice(i * chunkSize, i * chunkSize + chunkSize)
			  );
	}

	private getChunkSegmentFlag(index: number, length: number): ApduFlag {
		/** set the payload segment flag */
		if (index > 0 && index < length - 1) {
			/** N(2)..N-1 where N > 2 */
			return ApduFlag.P1_MORE;
		} else if (index === length - 1 && length > 1) {
			/** Nth where N > 1 */
			return ApduFlag.P1_LAST;
		} else if (index === 0 && length > 1) {
			/** N(1) where N > 1 */
			return ApduFlag.P1_FIRST;
		} else {
			return this.p1;
		}
	}
}

export { ApduFlag as Flag };
export { Apdu as Builder };
