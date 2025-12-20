'use client'

import Link from "next/link"
import { Sparkles, Github, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NanoJason
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Translator
          </Link>
          <Link 
            href="https://github.com/your-username/nanojason" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link 
            href="https://jasonformat.org/docs" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <Link href="/">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}