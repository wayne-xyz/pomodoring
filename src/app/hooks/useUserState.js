import { useAuth } from "./userAuth";
import { useState, useEffect, useCallback } from "react";
import { createOrUpdateUserState, getUserState } from "../firestoreService/stateService";




export function useUserState() {
	const { user, loading:authLoading } = useAuth();
	const [userState, setUserState] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchUserState = useCallback(async () => {
		if (!user || authLoading) {
			setUserState(null);
			setIsLoading(false);
			return;
		}

		try {
			setIsLoading(true);
			setError(null);
			const state = await getUserState(user.userId);
			setUserState(state);
		} catch (err) {
			console.error("Error fetching user state:", err);
			setError("Failed to fetch user state");
		} finally {
			setIsLoading(false);
		}
	}, [user, authLoading]);

	const updateUserState = useCallback(async (isInSession, startTime) => {
		if (!user || authLoading) return;

		try {
			setIsLoading(true);
			setError(null);
			const updatedState = await createOrUpdateUserState(user.userId, isInSession, startTime);
			setUserState(updatedState);
		} catch (err) {
			console.error("Error updating user state:", err);
			setError("Failed to update user state");
		} finally {
			setIsLoading(false);
		}
	}, [user, authLoading]);

	useEffect(() => {
		fetchUserState();
	}, [fetchUserState]);

	return { 
		userState, 
		updateUserState, 
		isLoading, 
		error,
		refetch: fetchUserState,
		authLoading
	};
}
