import create from "zustand";

const [useMaquetteStore, maquetteApi] = create(set => ({ init: false }));

export default useMaquetteStore;
export { maquetteApi };
