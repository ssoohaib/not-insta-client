import { create } from "zustand";

const useInterestStore = create((set) => ({
  selectedInterests: [],
  toggleInterest: (interest) =>
    set((state) => {
      const isSelected = state.selectedInterests.includes(interest);
      console.log('interest:', interest);
      return {
        selectedInterests: isSelected
          ? state.selectedInterests.filter((i) => i !== interest)
          : [...state.selectedInterests, interest],
      };
    }),
}));

export default useInterestStore;
