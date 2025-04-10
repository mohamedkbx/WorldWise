import React from 'react'
import { useEffect } from 'react';
import {useAuth} from "../context/FakeAuthContext";
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
const {isAuth} = useAuth();
const navigate =  useNavigate();

useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return children;
  
}
