"use server";
import { db } from '@/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';

export const updatePantry = async () => {
	const data = query(collection(db, 'inventory'));
	const docs = await getDocs(data);
	const pantryList = [];
	docs.forEach((doc) => {
		pantryList.push({
			name: doc.id,
			...doc.data(),
		});
	});
	return pantryList;
}

export const addItem = async (item) => {
	const docRef = doc(collection(db, 'inventory'), item);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const {quantity} = docSnap.data();
		await setDoc(docRef, {quantity: quantity + 1});
	}
	else {
		await setDoc(docRef, {quantity: 1});
	}
}

export const removeItem = async (item) => {
	const docRef = doc(collection(db, 'inventory'), item);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const {quantity} = docSnap.data();
		if (quantity === 1) {
			await deleteDoc(docRef);
		}
		else {
			await setDoc(docRef, {quantity: quantity - 1});
		}
	}
}
