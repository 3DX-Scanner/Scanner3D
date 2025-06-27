import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST({ request, cookies }) {
	const { email, password } = await request.json();

	const user = await prisma.user.findUnique({ where: { email } });

	// 🔐 Vérifie email + mot de passe (en clair ici)
	if (!user || user.password !== password) {
		return json({ error: 'Identifiants invalides' }, { status: 401 });
	}

	const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
		expiresIn: '1h'
	});

	cookies.set('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 // 1h
	});

	return json({ success: true });
}
