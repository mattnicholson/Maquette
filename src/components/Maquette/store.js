import create from "zustand";

const [useMaquetteStore, maquetteApi] = create(set => ({ init: false }));

const maquetteUtils = {
  updateState: (label, id, mode = "toggle") => {
    let stateMap = maquetteApi.getState().stateMap;
    let target = Object.keys(stateMap).find(k => k === id);
    let states = target ? [...stateMap[target]] : [];
    if (target) target = id;

    let ix = states.indexOf(label);
    if (ix == -1) {
      if (mode === "remove") return;
      states.push(label);
    } else {
      if (mode === "add") return;
      states.splice(ix, 1);
    }

    let newStateMap = { ...stateMap };
    newStateMap[id] = states;
    maquetteApi.setState({ stateMap: newStateMap });
  },
  toggleState: (label, id, mode = "toggle") => {
    maquetteUtils.updateState(label, id, "toggle");
  },
  addState: (label, id) => {
    maquetteUtils.updateState(label, id, "add");
  },
  removeState: (label, id) => {
    maquetteUtils.updateState(label, id, "remove");
  }
};

export default useMaquetteStore;
export { maquetteApi, maquetteUtils };
