import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Loader2, Upload, FileSpreadsheet, X, Check, AlertCircle, 
  ChevronRight, BarChart, SkipForward, Menu, Send,
  Zap, LineChart, Heart, Leaf, PieChart
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

function AIDashboard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('marketAnalysisData')
    return savedData ? JSON.parse(savedData) : {
      basicInfo: { text: '', files: [], status: 'pending' },
      marketNeed: { text: '', files: [], status: 'pending' },
      targetMarket: { text: '', files: [], status: 'pending' },
      competitors: { text: '', files: [], status: 'pending' },
      marketSize: { text: '', files: [], status: 'pending' }
    }
  })
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const sidebarOptions = [
    { id: 'campaign', label: 'AI Campaign Generator', icon: <Zap className="w-5 h-5" /> },
    { id: 'predictor', label: 'Success Predictor', icon: <LineChart className="w-5 h-5" /> },
    { id: 'loyalty', label: 'Loyalty Optimizer', icon: <Heart className="w-5 h-5" /> },
    { id: 'ethics', label: 'Ethics & Sustainability', icon: <Leaf className="w-5 h-5" /> },
    { id: 'impact', label: 'Impact Report', icon: <PieChart className="w-5 h-5" /> },
  ]

  useEffect(() => {
    localStorage.setItem('marketAnalysisData', JSON.stringify(formData))
    setProgress(calculateProgress())
  }, [formData])

  const questions = [
    {
      key: 'basicInfo',
      label: 'Product Overview 🚀',
      placeholder: "What's your product name and what core problem does it solve?",
      fileHint: 'Upload product specs, feature docs (XLSX, CSV)',
      fileTypes: '.xlsx,.xls,.csv',
      icon: <BarChart className="w-5 h-5 text-purple-200" />
    },
    {
      key: 'marketNeed',
      label: 'Market Need & Pain Points 🎯',
      placeholder: "What specific market pain points does your product address?",
      fileHint: 'Upload market research data (XLSX, CSV)',
      fileTypes: '.xlsx,.xls,.csv',
      icon: <BarChart className="w-5 h-5 text-purple-200" />
    },
    {
      key: 'targetMarket',
      label: 'Target Market Analysis 👥',
      placeholder: "Describe your ideal customer segments and their characteristics",
      fileHint: 'Upload customer data analysis (XLSX, CSV)',
      fileTypes: '.xlsx,.xls,.csv',
      icon: <BarChart className="w-5 h-5 text-purple-200" />
    },
    {
      key: 'competitors',
      label: 'Competitive Landscape 🔄',
      placeholder: "Who are your main competitors and how do you differentiate?",
      fileHint: 'Upload competitor analysis (XLSX, CSV)',
      fileTypes: '.xlsx,.xls,.csv',
      icon: <BarChart className="w-5 h-5 text-purple-200" />
    },
    {
      key: 'marketSize',
      label: 'Market Size & Opportunity 📊',
      placeholder: "What's your TAM, SAM, and SOM? Include market values if possible",
      fileHint: 'Upload market size calculations (XLSX, CSV)',
      fileTypes: '.xlsx,.xls,.csv',
      icon: <BarChart className="w-5 h-5 text-purple-200" />
    }
  ]

  const calculateProgress = () => {
    const totalSteps = questions.length
    const completedSteps = Object.values(formData).filter(item =>
      item.text.trim().length > 0 || item.files.length > 0
    ).length
    return (completedSteps / totalSteps) * 100
  }

  const handleFileUpload = (e, key) => {
    const files = Array.from(e.target.files)
    const updatedFiles = files.map(file => ({
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      uploadDate: new Date().toLocaleString()
    }))

    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        files: [...prev[key].files, ...updatedFiles],
        status: 'completed'
      }
    }))
  }

  const removeFile = (key, fileName) => {
    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        files: prev[key].files.filter(file => file.name !== fileName),
        status: prev[key].files.length <= 1 ? 'pending' : 'completed'
      }
    }))
  }

  const handleTextChange = (e, key) => {
    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        text: e.target.value,
        status: e.target.value.trim().length > 0 ? 'completed' : 'pending'
      }
    }))
  }

  const handleSkip = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setResponse('Analysis completed successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-black via-purple-950/10 to-black">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className={cn(
          "fixed h-full bg-black/95 border-r border-purple-900/20 transition-all duration-300 z-20 shadow-2xl",
          isSidebarOpen ? "w-64 md:w-72" : "w-16"
        )}>
          <div className="flex items-center justify-between p-4 border-b border-purple-900/20">
            <h2 className={cn(
              "text-purple-100 font-semibold transition-opacity duration-300 text-lg",
              isSidebarOpen ? "opacity-100" : "opacity-0"
            )}>
              AI Tools
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-purple-100 hover:bg-purple-900/20 transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-2">
            {sidebarOptions.map((option, index) => (
              <Button
                key={option.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-2 text-purple-100 hover:bg-purple-900/20 transition-all duration-300",
                  "group relative overflow-hidden",
                  index === 0 && "bg-purple-900/20",
                  "hover:translate-x-1"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 
                              transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {option.icon}
                <span className={cn(
                  "ml-2 transition-all duration-300",
                  isSidebarOpen ? "opacity-100" : "opacity-0 hidden"
                )}>
                  {option.label}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          isSidebarOpen ? "ml-64 md:ml-72" : "ml-16"
        )}>
          <div className="h-full p-4 md:p-6 space-y-6">
            {/* Progress Bar */}
            <div className="bg-black/90 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-purple-900/20 
                          shadow-lg transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-100 font-medium">Analysis Progress</span>
                <span className="text-purple-100 font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2.5 bg-purple-950/30" />
            </div>

            {/* Main Form Card */}
            <Card className="flex-1 bg-black/90 backdrop-blur-lg border-purple-900/20 shadow-xl">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-100 text-2xl md:text-3xl flex items-center gap-3 font-semibold">
                    {questions[currentStep].icon}
                    {questions[currentStep].label}
                  </CardTitle>
                  <span className="text-purple-200 text-sm bg-purple-900/20 px-3 py-1.5 rounded-full">
                    Step {currentStep + 1} of {questions.length}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Text Input Section */}
                <div className="group transition-all duration-300">
                  <textarea
                    value={formData[questions[currentStep].key].text}
                    onChange={(e) => handleTextChange(e, questions[currentStep].key)}
                    className="w-full h-48 p-5 rounded-lg resize-none 
                             bg-purple-950/20 text-white border-2 border-purple-900/20 
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                             transition-all duration-300
                             placeholder-purple-300/70
                             group-hover:border-purple-500/30
                             text-lg"
                    placeholder={questions[currentStep].placeholder}
                  />
                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Button 
                      type="button"
                      className="bg-purple-900/30 hover:bg-purple-800/40 transition-all duration-300
                               transform hover:translate-y-[-2px] hover:shadow-lg
                               relative overflow-hidden group w-full sm:w-auto"
                      onClick={() => document.getElementById(`file-upload-${currentStep}`).click()}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 
                                    transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Supporting Data
                    </Button>
                    <span className="text-purple-200/80 text-sm italic">
                      {questions[currentStep].fileHint}
                    </span>
                  </div>
                  
                  <input
                    id={`file-upload-${currentStep}`}
                    type="file"
                    accept={questions[currentStep].fileTypes}
                    onChange={(e) => handleFileUpload(e, questions[currentStep].key)}
                    className="hidden"
                    multiple
                  />

                  {/* File List */}
                  {formData[questions[currentStep].key].files.length > 0 && (
                    <div className="space-y-3">
                      {formData[questions[currentStep].key].files.map((file, index) => (
                        <div key={index} 
                             className="flex items-center gap-4 bg-purple-950/20 p-4 rounded-lg
                                      transition-all duration-300 hover:bg-purple-950/30
                                      transform hover:translate-x-1 hover:shadow-md
                                      border border-purple-900/20 group">
                          <FileSpreadsheet className="w-5 h-5 text-purple-100 group-hover:scale-110 transition-transform duration-300" />
                          <div className="flex-1 min-w-0">
                            <div className="text-purple-100 font-medium truncate">{file.name}</div>
                            <div className="text-purple-300/80 text-sm">
                              {file.size} MB • Uploaded {file.uploadDate}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-purple-200 hover:text-red-400 hover:bg-red-900/20
                                     transition-all duration-300 group-hover:translate-x-1"
                            onClick={() => removeFile(questions[currentStep].key, file.name)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                  <div className="flex gap-3 order-2 sm:order-1">
                    <Button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      disabled={currentStep === 0}
                      className="bg-purple-900/30 hover:bg-purple-800/40 transition-all duration-300
                               transform hover:translate-y-[-2px] disabled:transform-none
                               flex-1 sm:flex-none"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSkip}
                      disabled={currentStep === questions.length - 1}
                      variant="outline"
                      className="border-purple-900/20 text-purple-100 hover:bg-purple-900/20
                               transition-all duration-300 transform hover:translate-y-[-2px]
                               flex-1 sm:flex-none"
                    >
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip
                    </Button>
                  </div>
                  {currentStep === questions.length - 1 ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-green-600/80 hover:bg-green-600 transition-all duration-300
                               transform hover:translate-y-[-2px] hover:shadow-lg
                               relative overflow-hidden group order-1 sm:order-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                                    transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Analysis
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="bg-purple-900/30 hover:bg-purple-800/40 transition-all duration-300
                               transform hover:translate-y-[-2px] hover:shadow-lg
                               relative overflow-hidden group order-1 sm:order-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 
                                    transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="bg-black/90 backdrop-blur-lg border-purple-900/20 shadow-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-purple-100 text-2xl">Market Analysis Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="min-h-[300px] p-6 bg-purple-950/20 rounded-lg text-blue-100 border border-purple-900/20">
                  {progress === 100 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Analysis Complete!</span>
                      </div>
                      <pre className="whitespace-pre-wrap bg-purple-950/30 p-4 rounded-lg border border-purple-900/20">
                        {JSON.stringify(formData, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-purple-200">
                      <AlertCircle className="w-8 h-8 mb-3 animate-pulse" />
                      <span className="font-medium">Complete all sections to generate analysis</span>
                      <span className="text-sm mt-2 text-purple-300/80">{Math.round(progress)}% completed</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIDashboard