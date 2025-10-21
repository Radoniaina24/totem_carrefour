'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { skillSchema, languageSchema } from '@/lib/validation';
import { Skill, Language } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Code, Languages } from 'lucide-react';
import { useState } from 'react';

interface StepSkillsProps {
  skillsData: Skill[];
  languagesData: Language[];
  onNext: (skills: Skill[], languages: Language[]) => void;
  onBack: () => void;
}

export default function StepSkills({ skillsData, languagesData, onNext, onBack }: StepSkillsProps) {
  const [skills, setSkills] = useState<Skill[]>(skillsData.length > 0 ? skillsData : []);
  const [languages, setLanguages] = useState<Language[]>(languagesData.length > 0 ? languagesData : []);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showLanguageForm, setShowLanguageForm] = useState(false);

  const {
    register: registerSkill,
    handleSubmit: handleSubmitSkill,
    reset: resetSkill,
    setValue: setSkillValue,
    formState: { errors: skillErrors },
  } = useForm<Omit<Skill, 'id'>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      level: 'intermediate',
    },
  });

  const {
    register: registerLanguage,
    handleSubmit: handleSubmitLanguage,
    reset: resetLanguage,
    setValue: setLanguageValue,
    formState: { errors: languageErrors },
  } = useForm<Omit<Language, 'id'>>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      name: '',
      level: 'conversational',
    },
  });

  const onSubmitSkill = (data: Omit<Skill, 'id'>) => {
    setSkills([...skills, { ...data, id: Date.now().toString() }]);
    resetSkill();
    setShowSkillForm(false);
  };

  const onSubmitLanguage = (data: Omit<Language, 'id'>) => {
    setLanguages([...languages, { ...data, id: Date.now().toString() }]);
    resetLanguage();
    setShowLanguageForm(false);
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const deleteLanguage = (id: string) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const handleNext = () => {
    if (skills.length === 0) {
      alert('Veuillez ajouter au moins une compétence');
      return;
    }
    onNext(skills, languages);
  };

  const skillLevelLabels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
    expert: 'Expert',
  };

  const languageLevelLabels = {
    basic: 'Notions de base',
    conversational: 'Conversationnel',
    fluent: 'Courant',
    native: 'Langue maternelle',
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compétences et Langues</h2>
        <p className="text-gray-600">Ajoutez vos compétences techniques et langues parlées</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-600" />
            Compétences
          </h3>
        </div>

        {skills.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{skill.name}</p>
                  <p className="text-sm text-gray-600">{skillLevelLabels[skill.level]}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSkill(skill.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {!showSkillForm ? (
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-2 py-6"
            onClick={() => setShowSkillForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une compétence
          </Button>
        ) : (
          <form onSubmit={handleSubmitSkill(onSubmitSkill)} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <Label htmlFor="skillName">Nom de la compétence *</Label>
              <Input
                id="skillName"
                placeholder="ex: JavaScript, React, Python..."
                {...registerSkill('name')}
                className={skillErrors.name ? 'border-red-500' : ''}
              />
              {skillErrors.name && (
                <p className="text-red-500 text-sm mt-1">{skillErrors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="skillLevel">Niveau *</Label>
              <Select onValueChange={(value) => setSkillValue('level', value as Skill['level'])} defaultValue="intermediate">
                <SelectTrigger className={skillErrors.level ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Débutant</SelectItem>
                  <SelectItem value="intermediate">Intermédiaire</SelectItem>
                  <SelectItem value="advanced">Avancé</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              {skillErrors.level && (
                <p className="text-red-500 text-sm mt-1">{skillErrors.level.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Ajouter</Button>
              <Button type="button" variant="outline" onClick={() => {
                resetSkill();
                setShowSkillForm(false);
              }}>
                Annuler
              </Button>
            </div>
          </form>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Languages className="w-5 h-5 text-green-600" />
            Langues
          </h3>
        </div>

        {languages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {languages.map((language) => (
              <div key={language.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{language.name}</p>
                  <p className="text-sm text-gray-600">{languageLevelLabels[language.level]}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteLanguage(language.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {!showLanguageForm ? (
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-2 py-6"
            onClick={() => setShowLanguageForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une langue
          </Button>
        ) : (
          <form onSubmit={handleSubmitLanguage(onSubmitLanguage)} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <Label htmlFor="languageName">Langue *</Label>
              <Input
                id="languageName"
                placeholder="ex: Français, Anglais, Espagnol..."
                {...registerLanguage('name')}
                className={languageErrors.name ? 'border-red-500' : ''}
              />
              {languageErrors.name && (
                <p className="text-red-500 text-sm mt-1">{languageErrors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="languageLevel">Niveau *</Label>
              <Select onValueChange={(value) => setLanguageValue('level', value as Language['level'])} defaultValue="conversational">
                <SelectTrigger className={languageErrors.level ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Sélectionnez un niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Notions de base</SelectItem>
                  <SelectItem value="conversational">Conversationnel</SelectItem>
                  <SelectItem value="fluent">Courant</SelectItem>
                  <SelectItem value="native">Langue maternelle</SelectItem>
                </SelectContent>
              </Select>
              {languageErrors.level && (
                <p className="text-red-500 text-sm mt-1">{languageErrors.level.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Ajouter</Button>
              <Button type="button" variant="outline" onClick={() => {
                resetLanguage();
                setShowLanguageForm(false);
              }}>
                Annuler
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="button" onClick={handleNext}>
          Voir le CV
        </Button>
      </div>
    </div>
  );
}
