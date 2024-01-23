import { ISearchErrors, ISearchForm } from "@/types/types";

export function searchValidator(
  searchForm: ISearchForm
): Record<string, string> {
  let errors: Record<string, string> = {};
  if (searchForm.title.length >= 25) {
    errors.title = "The title must be under 25 characters";
  }
  if (searchForm.author.length >= 25) {
    errors.author = "The author must be under 25 characters";
  }
  if (searchForm.content.length >= 50) {
    errors.content = "The content must be under 50 characters";
  }

  return errors;
}

export function createPostValidator(
  searchForm: ISearchForm
): Record<string, string> {
  let errors: Record<string, string> = {};
  // title validations
  if (searchForm.title.length === 0) {
    errors.title = "Enter a title";
  }
  if (searchForm.title.length >= 25) {
    errors.title = "The title must be under 25 characters";
  }

  // author validations
  if (searchForm.author.length === 0) {
    errors.author = "Enter an author";
  }
  if (searchForm.author.length >= 25) {
    errors.author = "The author must be under 25 characters";
  }

  // content validations
  if (searchForm.content.length === 0) {
    errors.content = "Enter a content";
  }
  if (searchForm.content.length >= 250) {
    errors.content = "The content must be under 250 characters";
  }

  return errors;
}
