import type { IModes } from "../../../../Interfaces/Options/Interactivity/Modes/IModes";
import { Bubble } from "./Bubble";
import { Connect } from "./Connect";
import { Grab } from "./Grab";
import { Remove } from "./Remove";
import { Push } from "./Push";
import { Repulse } from "./Repulse";
import { Slow } from "./Slow";
import type { IBubble } from "../../../../Interfaces/Options/Interactivity/Modes/IBubble";
import type { IConnect } from "../../../../Interfaces/Options/Interactivity/Modes/IConnect";
import type { IGrab } from "../../../../Interfaces/Options/Interactivity/Modes/IGrab";
import type { IPush } from "../../../../Interfaces/Options/Interactivity/Modes/IPush";
import type { IRemove } from "../../../../Interfaces/Options/Interactivity/Modes/IRemove";
import type { IRepulse } from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";
import type { ISlow } from "../../../../Interfaces/Options/Interactivity/Modes/ISlow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IEmitter } from "../../../../Interfaces/Options/Emitters/IEmitter";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { Emitter } from "../../Emitters/Emitter";
import type { IParticles } from "../../../../Interfaces/Options/Particles/IParticles";

export class Modes implements IModes {
	public bubble: IBubble;
	public connect: IConnect;
	public grab: IGrab;
	public push: IPush;
	public remove: IRemove;
	public repulse: IRepulse;
	public slow: ISlow;
	public emitters: SingleOrMultiple<IEmitter>;

	constructor() {
		this.bubble = new Bubble();
		this.connect = new Connect();
		this.grab = new Grab();
		this.push = new Push();
		this.remove = new Remove();
		this.repulse = new Repulse();
		this.slow = new Slow();
		this.emitters = [];
	}

	public load(data?: RecursivePartial<IModes>, particles?: IParticles): void {
		if (data !== undefined) {
			this.bubble.load(data.bubble);
			this.connect.load(data.connect);
			this.grab.load(data.grab);
			this.push.load(data.push);
			this.remove.load(data.remove);
			this.repulse.load(data.repulse);
			this.slow.load(data.slow);

			if (data.emitters !== undefined && particles !== undefined) {
				if (data.emitters instanceof Array) {
					this.emitters = data.emitters.map((s) => {
						const tmp = new Emitter();

						tmp.load(s, particles);

						return tmp;
					});
				} else {
					if (this.emitters instanceof Array) {
						this.emitters = new Emitter();
					}

					(this.emitters as Emitter).load(data.emitters, particles);
				}
			}
		}
	}
}
