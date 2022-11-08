import { ASICallback } from '../interfaces/socket';

abstract class ASIBase {
    public abstract load(interfaces: Map<string, ASICallback>): void;
}

export default ASIBase;